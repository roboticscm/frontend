import { v4 as uuidv4 } from 'uuid';

export class StringUtil {
    static countSubString(source, subStr) {
        return source.split(subStr).length - 1;
    }

    static genUUID() {
        return uuidv4();
    };

    static countDiv(source) {
        return (source.match(/<div>/g) || []).length;
    }

}