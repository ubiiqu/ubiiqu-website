/*global test:true expect:true equal:true asyncTest:true start:true ok:true*/


	test("Testing sample function", function() {

		expect(1);

		equal(sample(), true, "Sample should always return true" );

	});

	test("Testing for existance of window.test", function() {

		expect(2);

		equal(typeof example, 'object', "window.example should be an object" );
		equal(window.example.foo, 'bar', "window.example should have a property 'foo' with the value 'bar'" );

	});
