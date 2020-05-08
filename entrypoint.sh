#!/bin/sh -l


rm -rf node_modules
rm yarn.lock
a=$(ls | xargs)
echo "$a"
yarn
npm run test
