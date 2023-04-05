import { describe, expect, it } from "vitest";
import { validateNameLength, validatePasswordLength } from "./length";

describe("Field length validation", () => {
	describe("Name field", () => {
		let name = "";

		it("a name should fail length validation if it is not set", () => {
			expect(validateNameLength(name)).toEqual(false);
		});

		it("a name should fail length validation if it is less than 2 characters", () => {
			name = "J";
			expect(validateNameLength(name)).toEqual(false);
		});

		it("a name should pass length validation if it is 2 characters", () => {
			name = "Jo";
			expect(validateNameLength(name)).toEqual(true);
		});

		it("a name should pass length validation if it is more than 2 characters", () => {
			name = "Jon";
			expect(validateNameLength(name)).toEqual(true);
		});
	});

	describe("Password field", () => {
		let password = "";

		it("a password should fail length validation if it is not set", () => {
			expect(validatePasswordLength(password)).toEqual(false);
		});

		it("a password should fail length validation if it is less than 6 characters", () => {
			password = "Jontt";
			expect(validatePasswordLength(password)).toEqual(false);
		});

		it("a password should fail length validation if it is more than 20 characters", () => {
			password = "qwertyuiopñlkjhgfdsazxcvb";
			expect(validatePasswordLength(password)).toEqual(false);
		});

		it("a password should pass length validation if it is 6-20 characters", () => {
			password = "password";
			expect(validatePasswordLength(password)).toEqual(true);
		});
	});
});
