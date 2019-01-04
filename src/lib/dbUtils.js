
import moment from 'moment';
import { default as axios } from "axios";
import { default as queryString } from "query-string";
import { SQLite } from 'expo';
import _ from "lodash";
import { AsyncStorage } from "react-native"

class DBUtils {

    static upgrade() {
        return new Promise((resolve, reject) => {
            let db = SQLite.openDatabase('derkatalog.db');
            db.transaction(tx => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS auth(id INTEGER PRIMARY KEY NOT NULL, oauth_token TEXT, oauth_token_secret TEXT)`, [], (trans, rs) => {
                    resolve(rs);
                }, (trans, err) => {
                    reject(err);
                });
            });
        });
    }

    static select(sql) {
        return new Promise((resolve, reject) => {
            let db = SQLite.openDatabase('derkatalog.db');
            db.transaction(tx => {
                tx.executeSql(sql, [], (trans, rs) => {
                    resolve(rs);
                }, (trans, err) => {
                    reject(err);
                });
            });
        });
    }

    static upsert(sql, params) {
        return new Promise((resolve, reject) => {
            let db = SQLite.openDatabase('derkatalog.db');
            db.transaction(tx => {
                tx.executeSql(sql, params, (trans, rs) => {
                    resolve(rs);
                }, (trans, err) => {
                    reject(err);
                });
            });
        });
    }
}
export default DBUtils;