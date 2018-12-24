#!/bin/bash
echo building ts-basics...

echo compiling...
tsc
if [ "$?" != "0" ]; then
    exit 1
fi

echo running tests...
npm run test > test.log 2> /dev/null
if [ "$?" != "0" ]; then
    echo errors in tests:
    cat test.log
    exit 1
fi

echo copying...
cp package.json dist
cp .npmignore dist

echo done!