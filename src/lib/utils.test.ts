import { cn, getIsJsonObjStr, tryIt, tryItAsync } from "./utils"

describe('cn function', () => {
  it("Merges and conditionally adds classes", ()=>{
    const finalClassStr = cn(['px-1', true && 'p-3', {'p-4': false}])
    expect(finalClassStr).toBe('p-3');
  })
});
describe('TryIt function', () => {
  it("Passes when arrow fn passes", () => {
    const result1 = tryIt(() => 2)
    expect(result1).toEqual({ success: true, data: 2 })

    const result2 = tryIt(() => ({ name: "foo", age: 30 }))
    expect(result2).toEqual({ success: true, data: { name: "foo", age: 30 } })
  })

  it("Fails when arrow fn fails", () => {
    const result1 = tryIt(() => {
      throw new Error("foo")
    })
    expect(result1).toEqual({ success: false, err: new Error("foo") })

    const result2 = tryIt(() => {
      throw new Error("bar")
    })
    expect(result2).toEqual({ success: false, err: new Error("bar") })
  })
})

describe('TryItAsync function', () => {
  it("Passes when arrow fn passes", async () => {
    const result1 = await tryItAsync(async () => 2)
    expect(result1).toEqual({ success: true, data: 2 })

    const result2 = await tryItAsync(async () => ({ name: "foo", age: 30 }))
    expect(result2).toEqual({ success: true, data: { name: "foo", age: 30 } })
  })

  it("Fails when arrow fn fails", async () => {
    const result1 = await tryItAsync(async () => {
      throw new Error("foo")
    })
    expect(result1).toEqual({ success: false, err: new Error("foo") })

    const result2 = await tryItAsync(async () => {
      throw new Error("bar")
    })
    expect(result2).toEqual({ success: false, err: new Error("bar") })
  })
})

describe('getIsJsonObj function', () => {
  it("Returns true for JSON strings", () => {
    const testData = [
      { foo: "foo", bar: "bar", foobar: 1 },
      { name: 'foo', age: 30, bar: null, foo: true },
      [{ foo: 'foo', bar: 'bar' }, { foo: 'bar', bar: 'foo' }]
    ];

    testData.forEach(obj => {
      const objStr = JSON.stringify(obj);
      expect(getIsJsonObjStr(objStr)).toBe(true);
    })
  })

  it("Returns false for non JSON strings", () => {
    const testData = [
      1,
      'foobar',
      null,
      true,
      undefined
    ];
    testData.forEach(obj => {
      const objStr = JSON.stringify(obj);
      expect(getIsJsonObjStr(objStr)).toBe(false);
    })
  })
})
