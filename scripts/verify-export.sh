#!/usr/bin/env bash
# Asserts the exported static site is actually deployable.
# Every check here guards a bug that `next dev` cannot surface, because dev
# hydrates instantly and the export is what S3 actually serves.
set -uo pipefail

OUT="${1:-out}"
fail=0

check() {
    if [ "$1" = "pass" ]; then
        printf '  \033[32mPASS\033[0m  %s\n' "$2"
    else
        printf '  \033[31mFAIL\033[0m  %s\n' "$2"
        fail=1
    fi
}

echo "Verifying export in ./$OUT"

[ -d "$OUT" ] || { echo "  FAIL  no $OUT/ directory - run the build first"; exit 1; }

# Routes exist as real S3 keys (trailingSlash: true emits dir/index.html).
for page in "index.html" "resume/index.html" "404.html"; do
    [ -f "$OUT/$page" ] && check pass "$page exists" || check fail "$page missing"
done

# Nothing may ship invisible. Framer serializes initial="hidden" to inline
# opacity:0, which renders a blank page to crawlers and JS-disabled clients.
hidden=$(grep -rlE 'opacity: ?0[;"]' "$OUT" --include='*.html' 2>/dev/null || true)
[ -z "$hidden" ] && check pass "no content shipped at opacity:0" \
    || check fail "opacity:0 present in: $(echo "$hidden" | tr '\n' ' ')"

# The CV must exist as text in the HTML, not be gated behind a client timer.
# ElastiCache and Ballymena are inside collapsed disclosure panels. They catch
# the panel being conditionally rendered, which keeps role detail out of the
# page entirely rather than merely collapsed.
for term in "Rapid7" "Queen" "StudentWallet" "ElastiCache" "Ballymena"; do
    grep -q "$term" "$OUT/resume/index.html" 2>/dev/null \
        && check pass "resume HTML contains '$term'" \
        || check fail "resume HTML missing '$term' - content is gated behind JS"
done

# A splash-only page is ~8KB; a real one is >25KB.
for page in "index.html" "resume/index.html"; do
    if [ -f "$OUT/$page" ]; then
        bytes=$(wc -c < "$OUT/$page" | tr -d ' ')
        [ "$bytes" -gt 25000 ] && check pass "$page is ${bytes}B" \
            || check fail "$page is only ${bytes}B - likely a stub"
    fi
done

# CloudFront -> S3 REST origin 404s on a missing trailing slash, so internal
# links must end in / (or point at a file with an extension).
bad=$(grep -rhoE 'href="/[^"#?]*"' "$OUT" --include='*.html' 2>/dev/null \
    | sort -u | grep -vE '/"$' | grep -vE '\.[a-zA-Z0-9]+"$' || true)
[ -z "$bad" ] && check pass "internal links all have trailing slashes" \
    || check fail "links missing trailing slash: $(echo "$bad" | tr '\n' ' ')"

# Static assets referenced by the page must have been copied.
[ -f "$OUT/CV_Elliott_McPherson.pdf" ] && check pass "CV PDF copied" \
    || check fail "CV PDF missing from export"

echo
[ "$fail" -eq 0 ] && echo "Export OK" || echo "Export has failures"
exit "$fail"
