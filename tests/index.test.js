import {main} from "../index.js";
import {readLogFile} from "../fileReader.js";

jest.mock('../fileReader.js', () => ({
    readLogFile: jest.fn().mockImplementation(() => Promise.resolve({
        ipMap: new Map(Object.entries({
            "177.71.128.21": 1,
            "168.41.191.40": 3,
            "168.41.191.41": 1,
        })),
        urlMap: new Map(Object.entries({
            "/intranet-analytics/": 3,
            'http://example.net/faq/': 2,
            '/this/page/does/not/exist/': 12,
            '/dsf/': 1
        }))
    }))
}))

describe('main', () => {
    it('reads log file and returns number of unique ip addresses with top 3 IP and URLs', async () => {
        const actualResponse = await main();
        const expectedResponse = {
            numberOfIPAddresses: 3,
            topIPAddresses: ['168.41.191.40', '177.71.128.21', '168.41.191.41'],
            topURLs: [
                '/this/page/does/not/exist/',
                '/intranet-analytics/',
                'http://example.net/faq/'
            ]
        }
        expect(actualResponse).toEqual(expectedResponse)
    })

    it('returns an object even when the log file contains less unique data', async () => {
        readLogFile.mockImplementation(() => Promise.resolve({
            ipMap: new Map(Object.entries({
                "177.71.128.21": 1,
                "168.41.191.40": 3,
            })),
            urlMap: new Map(Object.entries({
                "/intranet-analytics/": 3,
                'http://example.net/faq/': 2,
            }))
        }))
        const actualResponse = await main();
        const expectedResponse = {
            numberOfIPAddresses: 2,
            topIPAddresses: [
                "168.41.191.40",
                "177.71.128.21",
                undefined
            ],
            topURLs: [
                "/intranet-analytics/",
                "http://example.net/faq/",
                undefined
            ]
        }
        expect(actualResponse).toEqual(expectedResponse)
    })
});