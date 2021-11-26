blockname="slider"

if ! command -v npm &> /dev/null
then
	echo "npm is not installed: install npm with 'sudo apt-get install npm'"
	exit 1
fi

if ! command -v zip &> /dev/null
then
	echo "zip is not installed: install zip with 'sudo apt-get install zip'"
	exit 1
fi

npm run build &&

(cd ./assets && babel client.esnext.js --out-file client-$blockname.js) &&

if ./wp-idg-ufr__block-$blockname.zip &> /dev/null
then
	rm ./wp-idg-ufr__block-$blockname.zip
fi

zip wp-idg-ufr__block-$blockname.zip ./build ./assets/client-$blockname.js ./$blockname.php -r &&

echo "Done. Packed file: wp-idg-ufr__block-$blockname.zip"
