package me;


import org.junit.platform.suite.api.IncludeTags;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@SelectPackages({"me.package_a", "me.package_b"})
@IncludeTags("production")
// This annotation is required for a JUnit 5 test suite.
// Suite help us run the tests spread into multiple classes and packages.
@Suite
public class JUnit5TestSuite {

}
