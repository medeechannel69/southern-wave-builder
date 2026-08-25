#!/usr/bin/env bash
set -u
base="${1:-http://127.0.0.1:8080}"
routes=(
  "/" "/services" "/packages" "/portfolio" "/demo" "/demo/restaurant" "/demo/hotel" "/demo/company"
  "/demo/contractor" "/demo/realestate" "/demo/insurance" "/demo/clinic" "/demo/sabaidi-home"
  "/about" "/blog" "/contact" "/quote" "/interest" "/order" "/faq" "/reviews" "/topup"
  "/track" "/thank-you" "/privacy" "/terms"
)
failures=0
for route in "${routes[@]}"; do
  status=$(curl -sS -L -o /dev/null -w "%{http_code}" "$base$route") || status="curl-error"
  printf '%-28s %s\n' "$route" "$status"
  if [[ "$status" != "200" ]]; then failures=$((failures + 1)); fi
done
printf '\nfailures=%s\n' "$failures"
exit "$failures"
