ng build --configuration=development --watch true &
PID="$!"

npx http-server "./dist/" --cors="*" --gzip=true --port=4251 $1 -c-1
PID0="$!"

trap "kill $PID $PID0" EXIT INT
wait