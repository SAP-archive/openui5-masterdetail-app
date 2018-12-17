#!/bin/bash

# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd/e445116166c79d7ac35eb38a5d348d546f3d1620
# Copyright 2018 Domenic Denicola
# Released under the MIT license:
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
# associated documentation files (the "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
# following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial
# portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
# TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
# CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.
#

echo "*** start custom deploy ***"
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"


echo "*** Checkout the gp-pages branch ***"
git fetch origin $TARGET_BRANCH
git checkout FETCH_HEAD -b $TARGET_BRANCH


echo "*** Remove existing files ***"
 find . ! -path "./dist" ! -path "./.git" ! -path . -maxdepth 1 -exec rm -rf {} \;
 ls -la

echo "*** Move built resources to the root folder ***"
mv -f dist/* .

echo "*** Commit the changes ***"

git add -A .
git commit -m "Deploy to GitHub Pages (Build #${TRAVIS_BUILD_ID})
${TRAVIS_COMMIT_MESSAGE}"

echo "*** Push the changes ***"
## Now that we're all set up, we can push.

git push origin $TARGET_BRANCH
