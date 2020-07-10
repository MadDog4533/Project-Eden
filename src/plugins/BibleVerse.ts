import EdenPlugin = require("../g10/modules/EdenPlugin");
import https from "https";
import * as config from "./BibleVerse/config.json";

const options: https.RequestOptions = {
    hostname: 'developers.youversionapi.com',
    path: '/1.0/verse_of_the_day/1?version_id=1',
    headers: {
        'User-Agent': 'Prjk Eden 0.0.9-14',
        accept: 'application/json',
        'X-YouVersion-Developer-Token': config.API_KEY,
    }
}

class BibleVerse extends EdenPlugin {
    Name = "BibleVerse";

    fetchVerse = function(){

    }

    onStart = function(){

        if (!config)
            return Promise.reject("Cannot Find Config File");

        if (!config.API_KEY)
            return Promise.reject("API_KEY is not set in config");

        https.get(options, res => {
            let _data: string | any;
            res.on('data', (data) => {
                _data += data.toString();
            })
            res.on('end', () => {
                _data = _data.replace('undefined', '');
                _data = <any> JSON.parse(_data);
                console.log(`[${_data.verse.human_reference}] ${_data.verse.text}`);
            });
        });

        return Promise.resolve(true);
    }
}

export = BibleVerse;