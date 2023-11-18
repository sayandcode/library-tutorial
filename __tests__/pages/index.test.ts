import { myFn } from "../../src/pages"
import { tempFn } from "../../src/db/temp";

jest.mock('../../src/db/temp');
const mockedTempFn = jest.mocked(tempFn)

describe('Test', () => {
  it('Does something', async () => {
    mockedTempFn.mockResolvedValue(2);
    const result = await myFn();
    expect(result).toEqual(2)
    expect(mockedTempFn).toHaveBeenCalledTimes(2)
  })
})
