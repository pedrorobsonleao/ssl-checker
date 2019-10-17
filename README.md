# ssl-checker
check ssl status to domain

# run
```
$ yarn install
$ yarn start
```
# sample
```shel
$ curl -s 'http://127.1:8080/v1/check/google.com'|jq
[
  {
    "valid_from": "2019-09-17T13:30:43.000Z",
    "valid_to": "2019-12-10T13:30:43.000Z",
    "domain": "google.com",
    "days_remaining": 54,
    "status": "active"
  }
]

```