mpq-server
==========

A node.js package for serving the contents of MPQ archives via HTTP.

## Installation
`npm install mpq-server -g`

## Usage
1. Start the server:
    * `mpq-server /path/to/archive/file.mpq --port 1234`
1. Send HTTP GET requests to the REST API:
    * `/mpq_files/:filename`
    * Example:
        * `http://servername/mpq_files/foo.cel`
1. Handle the HTTP response.


### Note
* File names within MPQ archives are often hashed using `\` as the directory marker. Make sure to encode them properly when sending the HTTP request.
    * Example:
        * File name: `levels\towndata\town.pal`
        * Encoded file name: `levels%5Ctowndata%5Ctown.pal`
            * `encodeURIComponent` works well here.
        * Full request: `http://servername/mpq_files/levels%5Ctowndata%5Ctown.pal`

## Disclaimer

MPQ archives often contain data copyrighted by Blizzard Entertainment.
As such, no MPQ data is distributed with this package.
Users of this package must supply their own MPQ data after having legally purchased the associated product.

Public streaming of MPQ data would violate Blizzard's EULA. Therefore, this package is only intended for personal use on a private network (`localhost`).
