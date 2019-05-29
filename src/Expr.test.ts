import { StringSource, SourcePointer } from "./Source";
import { parenthesis, Num, term, factor, expr } from "./Expr";

test("parentheses", () => {
	const source = new StringSource("(123)");
	const ptr = new SourcePointer(source);

	const [result, rest] = parenthesis().parse(ptr).from();
	expect(result).toStrictEqual(new Num(123));
});

test("factor", () => {
	const source1 = new StringSource("123");
	const ptr1 = new SourcePointer(source1);
	const [result1, rest1] = factor().parse(ptr1).from();
	expect(result1).toStrictEqual(new Num(123));

	const source2 = new StringSource("(123)");
	const ptr2 = new SourcePointer(source2);
	const [result2, rest2] = factor().parse(ptr2).from();
	expect(result2).toStrictEqual(new Num(123));
});

test("number", () => {
	const source1 = new StringSource("123");
	const ptr1 = new SourcePointer(source1);
	const [result1, rest1] = factor().parse(ptr1).from();
	expect(result1).toStrictEqual(new Num(123));

	const source2 = new StringSource("+123");
	const ptr2 = new SourcePointer(source2);
	const [result2, rest2] = factor().parse(ptr2).from();
	expect(result2).toStrictEqual(new Num(123));

	const source3 = new StringSource("-123");
	const ptr3 = new SourcePointer(source3);
	const [result3, rest3] = factor().parse(ptr3).from();
	expect(result3).toStrictEqual(new Num(-123));
});

test("plus", () => {
	const source = new StringSource("3+4");
	const ptr = new SourcePointer(source);
	const [result, rest] = expr.parse(ptr).from();
	expect(result.evaluate()).toStrictEqual(7);
});

test("term", () => {
	const source = new StringSource("3*4/2*2");
	const ptr = new SourcePointer(source);
	const [result, rest] = term().parse(ptr).from();
	expect(result.evaluate()).toStrictEqual(12);

	//const source2 = new StringSource("3*4/(2*2)");
	const source2 = new StringSource("3*4/(2*2)");
	const ptr2 = new SourcePointer(source2);
	const [result2, rest2] = term().parse(ptr2).from();
	expect(result2.evaluate()).toStrictEqual(3);
});


test("expr", () => {
	const source = new StringSource("3+4/2*2");
	const ptr = new SourcePointer(source);
	const [result, rest] = expr.parse(ptr).from();
	expect(result.evaluate()).toStrictEqual(7);

	const source2 = new StringSource("3*4/(2+2)");
	const ptr2 = new SourcePointer(source2);
	const [result2, rest2] = expr.parse(ptr2).from();
	expect(result2.evaluate()).toStrictEqual(3);
});

test("expr", () => {
	const source = new StringSource("3+4/2*2");
	const ptr = new SourcePointer(source);
	const [result, rest] = expr.parse(ptr).from();
	expect(result.evaluate()).toStrictEqual(7);

	const source2 = new StringSource("3*4/(2+2)");
	const ptr2 = new SourcePointer(source2);
	const [result2, rest2] = expr.parse(ptr2).from();
	expect(result2.evaluate()).toStrictEqual(3);
});