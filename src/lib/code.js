import { StringUtil } from "src/lib/string";
import { Code } from 'src/lib/constants';

export const getParts = (source) => {

    const scriptPartCount = StringUtil.countSubString(source, Code.openTag);

    if (scriptPartCount === 0) {
        return [source];
    }

    const result = [];
    let s = source;
    for (let i = 0; i < scriptPartCount; i++) {
        const startIndex = s.indexOf(Code.openTag);

        if (startIndex === 0) {
            const endIndex = s.indexOf(Code.closeTag);
            result.push(s.substring(startIndex, endIndex));
            s = s.substring(endIndex + Code.closeTag.length, s.length);

        } else if (startIndex > 0) {
            const outter = s.substring(0, startIndex);
            result.push(outter);
            const endIndex = s.indexOf(Code.closeTag);
            result.push(s.substring(startIndex, endIndex));
            s = s.substring(endIndex + Code.closeTag.length, s.length);

        }
    }
    return result;
};

export const getLanguage = (source) => {
    if (source.trim().startsWith('[language=')) {
        const startIndex = source.indexOf('=');
        const endIndex = source.indexOf(']');
        if (startIndex >= 0 && startIndex < endIndex) {

            return source.substring(startIndex + 1, endIndex);
        }
    } else {
        return 'javascript';
    }
}