# mondoapimock


# Object types

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

- Webhook
    - account_id
    - id
    - url

- Webhook Message
Send to hook URL
    - type
    - data
        - account_id
        - amount
        - created
        - currency
        - description
        - id

