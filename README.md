mpq-server
==========

A node.js package for serving the contents of MPQ archives via HTTP.

## Usage
* Copy MPQ archive to `data/`.
* Send HTTP requests to: `http://servername/mpq_files/:filename`
    * :exclamation:Note: File names within MPQ archives are often hashed using `\` as the directory marker. Make sure to encode them properly before sending an HTTP request.
    * Example:
        * File name: `levels\towndata\town.pal`
        * Encode with `encodeURIComponent`: `levels%5Ctowndata%5Ctown.pal`
        * Full request: `http://myserver/mpq_files/levels%5Ctowndata%5Ctown.pal`

## Disclaimer

MPQ archives often contain data copyrighted by Blizzard Entertainment.
As such, no MPQ data is distributed with this package.
Users of this package must supply their own MPQ data after having legally purchased the associated product.

Public streaming of MPQ data would violate Blizzard's EULA. Therefore, this package is only intended for personal use on a private network.
