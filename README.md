# mondoapimock

## Found artefacts

- Source code for [http://getmondo.co.uk/docs](http://getmondo.co.uk/docs)<br>
[https://github.com/mondough/docs](https://github.com/mondough/docs)

## Compare with other banking APIs

- [https://gocardless.com/about/jobs/](https://gocardless.com/about/jobs/)<br>
Technologies used are included in some of the job descriptions

- [https://developer.gocardless.com/pro/2015-07-06/#overview-supported-direct-debit-schemes](https://developer.gocardless.com/pro/2015-07-06/#overview-supported-direct-debit-schemes)

- [http://starlingbank.co.uk/](http://starlingbank.co.uk/)

- [https://app.syspay.com/docs/api/merchant_api.html](https://app.syspay.com/docs/api/merchant_api.html)


## Object types

- Merchant
    - id
    - address (id if not expand)
    - created
    - group_id
    - logo
    - name

- Address
    - id
    - address
    - city
    - country
    - latitude
    - longitude
    - postcode
    - region

- Transaction (also exposed as a Feed Item?)
    - id
    - account_balance
    - amount
    - currency ("GBP")
    - description
    - merchant (id if not expanded)
    - metadata
    - notes


- Feed Item
    - type ("image")
    - title
    - image_url
    - background_color
    - body

- Webhook (Send a message to hook URL)
    - account_id
    - id
    - url

- Webhook Message
    - type
    - data
        - account_id
        - amount
        - created
        - currency
        - description
        - id

