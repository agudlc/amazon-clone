import { describe, expect, it } from "vitest";
import { validateEmail } from "./email";

describe("Email validation", () => {
	let email = "";

	it("an empty input should not be valid", () => {
		expect(validateEmail(email)).toEqual(false);
	});

	it("it should have an @ symbol", () => {
		email = "jon@gmail.com";
		expect(email.includes("@")).toEqual(true);
	});

	it("it should have an . symbol", () => {
		expect(email.includes(".")).toEqual(true);
	});

	it("a valid email should pass validation", () => {
		expect(validateEmail(email)).toEqual(true);
	});

	it("a invalid email should not pass validation", () => {
		email = "jon@gmail";
		expect(validateEmail(email)).toEqual(false);
	});
});
