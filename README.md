assocr(1) -- upload image with flickr for command line bloging
==============================================================

SYNOPSIS
--------
```
assocr -t blog,family,mountain ~/Pictures/*.jpg
```

**assocr** upload image to flickr account accroding to config,
and generate embed script in javascript form.


DESCRIPTION
-----------
**assocr** upload images to flickr,
output readable and convient embed script to stdout.

to embed image from flickr, you need image id,
secret, farm id, server name. `assocr.js` upload
photo to flickr and get those key, `embed.js`
convert those infomation into image in html.

OPTIONS
-------
`assocr` default add tag `assocr` to uploaded image,
you can set other tag you want by camma seperate list by `-t` option.


INSTALLATION
------------
### NPM
```
## not publish yet
sudo npm i assocr -g
```

### MANUAL
```
git clone http://github.com/GHolk/assocr
vi index.js  # edit apiOption user_id field to your user id.
cp index.js /usr/bin/assocr
assocr --login  # output user-id, access-token, tocken-secret
pass add -m application/assocr <<ASSOCR
access_token    12345678901234567-1234567890123456
access_token_secret     abcdefg123456789
ASSOCR
```

each time upload, assocr would try get token and secret by pass.


EXAMPLE
-------
upload image in command line

```sh
assocr -t family,moutain 113.jpg 114.jpg 115.jpg
```

output like this:

```
['113.jpg', '114.jpg', '115.jpg']
[{
    "farm": "farm5",
    "server": "4579",
    "photo": "38324351791",
    "secret": "75567120d5",
    "user": "135370742@N08"
}, {
    "farm": "farm5",
    "server": "4516",
    "photo": "38293037282",
    "secret": "c5fdd0df66",
    "user": "135370742@N08"
}, {
    "farm": "farm5",
    "server": "4523",
    "photo": "38324868111",
    "secret": "40aa440a22",
    "user": "135370742@N08"
}]
```

copy paste into html or javascript file,
then use with embed.js:

```html
load embed.js first, which contain flk object.
<script src="embed.js"></script>

image to embed, paste previous output of assocr
<script>
// use set function associate name and flickr image info
flk.set(
    ['113.jpg', '114.jpg', '115.jpg']
    , // note need camma
    [{
        "farm": "farm5",
        "server": "4579",
        "photo": "38324351791",
        "secret": "75567120d5",
        "user": "135370742@N08"
    }, {
        "farm": "farm5",
        "server": "4516",
        "photo": "38293037282",
        "secret": "c5fdd0df66",
        "user": "135370742@N08"
    }, {
        "farm": "farm5",
        "server": "4523",
        "photo": "38324868111",
        "secret": "40aa440a22",
        "user": "135370742@N08"
    }]
)
</script>

then you can asscess image by flk object.
<script>
// get image by directly writing
document.write(flk.getNode('113.jpg').innerHTML)

// or use dom, gn is alias for getNode
document.body.append(flk.gn(/113/))

// use g flag to get numbers image
let imageList = flk.gn(/jpg$/g)
```

SEE ALSO
--------
[marked-man](https://github.com/kapouer/marked-man)
[node-flickrapi](https://github.com/Pomax/node-flickrapi)
[optimist](https://github.com/substack/node-optimist)

REPORTING BUGS
--------------
See github [GHolk/assocr](https://github.com/GHolk/assocr) .
