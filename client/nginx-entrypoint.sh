#!/usr/bin/bash
WWW_DIR=/usr/share/nginx/html
ENV_PREFIX=VITE_
INJECT_FILE_PATH="${WWW_DIR}/inject.js"
for envrow in $(printenv); do
  
    echo "  ${key}: \"${value}\""
done
echo "window.injectedEnv = {" >> "${INJECT_FILE_PATH}"
for envrow in $(printenv); do
  IFS='=' read -r key value <<< "${envrow}"
  if [[ $key == "${ENV_PREFIX}"* ]]; then
    echo "  ${key}: \"${value}\"," >> "${INJECT_FILE_PATH}"
  fi
done
echo "};" >> "${INJECT_FILE_PATH}"
[ -z "$@" ] && nginx -g 'daemon off;' || $@