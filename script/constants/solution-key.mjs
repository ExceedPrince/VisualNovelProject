/*export const solutionKey = {
    reina: {
        importants: {
            '0003-30': 'option_2',
            '0011-40': 'option_0',
            '0017-46': 'option_1',
            '0020-54': 'option_1',
            '0023-44': 'option_0',
            '0023-62': 'option_1',
            '0027-40': 'option_1',
        },
        mobileImportants: {
            '0009-r-23': 'option_0',
            '0022-r-9': 'option_0',
            '0028-r-15': 'option_2',
            '0033-r-27': 'option_3',
        },
    },
    brianna: {
        importants: {
            '0014-38': 'option_1',
            '0018-36': 'option_1',
            '0023-44': 'option_1',
            '0025-32': 'option_2',
            '0032-40': 'option_0',
        },
        mobileImportants: {
            '0016-b-23': 'option_2',
            '0019-b-28': 'option_1',
        },
    },
    daena: {
        importants: {
            '0005-19': 'option_1',
            '0011-40': 'option_2',
            '0018-36': 'option_0',
            '0024-36': 'option_2',
            '0031-48': 'option_1',
        },
        mobileImportants: {
            '0016-d-31': 'option_2',
            '0033-d-13': 'option_2',
        },
    },
    hailey: {
        importants: {
            '0008-41': 'option_1',
            '0014-38': 'option_0',
            '0017-46': 'option_0',
            '0021-27': 'option_0',
            '0024-36': 'option_0',
        },
        mobileImportants: {
            '0013-h-25': 'option_1',
            '0022-h-20': 'option_2',
        },
    },
    lindsay: {
        importants: {
            '0012-41': 'option_1',
            '0029-43': 'option_0',
        },
        mobileImportants: {

        },
    },
}*/

//ENCODING
/* const ez = msgpack.encode(solutionKey);
const az= btoa(String.fromCharCode.apply(null, ez)); */

export const solutionKey = "haVyZWluYYKqaW1wb3J0YW50c4enMDAwMy0zMKhvcHRpb25fMqcwMDExLTQwqG9wdGlvbl8wpzAwMTctNDaob3B0aW9uXzGnMDAyMC01NKhvcHRpb25fMacwMDIzLTQ0qG9wdGlvbl8wpzAwMjMtNjKob3B0aW9uXzGnMDAyNy00MKhvcHRpb25fMbBtb2JpbGVJbXBvcnRhbnRzhKkwMDA5LXItMjOob3B0aW9uXzCoMDAyMi1yLTmob3B0aW9uXzCpMDAyOC1yLTE1qG9wdGlvbl8yqTAwMzMtci0yN6hvcHRpb25fM6dicmlhbm5hgqppbXBvcnRhbnRzhacwMDE0LTM4qG9wdGlvbl8xpzAwMTgtMzaob3B0aW9uXzGnMDAyMy00NKhvcHRpb25fMacwMDI1LTMyqG9wdGlvbl8ypzAwMzItNDCob3B0aW9uXzCwbW9iaWxlSW1wb3J0YW50c4KpMDAxNi1iLTIzqG9wdGlvbl8yqTAwMTktYi0yOKhvcHRpb25fMaVkYWVuYYKqaW1wb3J0YW50c4WnMDAwNS0xOahvcHRpb25fMacwMDExLTQwqG9wdGlvbl8ypzAwMTgtMzaob3B0aW9uXzCnMDAyNC0zNqhvcHRpb25fMqcwMDMxLTQ4qG9wdGlvbl8xsG1vYmlsZUltcG9ydGFudHOCqTAwMTYtZC0zMahvcHRpb25fMqkwMDMzLWQtMTOob3B0aW9uXzKmaGFpbGV5gqppbXBvcnRhbnRzhacwMDA4LTQxqG9wdGlvbl8xpzAwMTQtMziob3B0aW9uXzCnMDAxNy00NqhvcHRpb25fMKcwMDIxLTI3qG9wdGlvbl8wpzAwMjQtMzaob3B0aW9uXzCwbW9iaWxlSW1wb3J0YW50c4KpMDAxMy1oLTI1qG9wdGlvbl8xqTAwMjItaC0yMKhvcHRpb25fMqdsaW5kc2F5gqppbXBvcnRhbnRzgqcwMDEyLTQxqG9wdGlvbl8xpzAwMjktNDOob3B0aW9uXzCwbW9iaWxlSW1wb3J0YW50c4A=";

//DECODING
/* const binaryString = atob(solutionKey);
        
const length = binaryString.length;
const bytes = new Uint8Array(length);
for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
}

const decodedData = msgpack.decode(bytes); */