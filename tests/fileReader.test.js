import {readLogFile} from "../fileReader";

describe('fileReader', () => {
    it('returns a frequency map based on the ip addresses and paths in the log', async () => {
        const actualResponse = await readLogFile('./tests/testData.log')
        const expectedResponse = {
            ipMap: new Map(Object.entries({
                "177.71.128.21": 1,
                "168.41.191.40": 3
            })),
            urlMap: new Map(Object.entries({
                "/intranet-analytics/": 1,
                'http://example.net/faq/': 1,
                '/this/page/does/not/exist/': 2
            }))
        }
        expect(actualResponse).toEqual(expectedResponse);
    })
})