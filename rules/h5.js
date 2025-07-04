const checkCustomRule = require('../lib/custom-rule/custom-rule.js');

module.exports = function(
	project,
) {
	let rule = {
		$name: 'H5',
		match: `$.model.*.explore.*`,
		description: 'The base/main view in an explore should be hoisted via labeling',
		ruleFn,
	};
	let messages = checkCustomRule(rule, project, {ruleSource: 'internal'});

	return {messages, rule};
};

function ruleFn(match, path, project, options={}) {
	const prefix = options.prefix!==undefined ? options.prefix : '[';
	const suffix = options.suffix!==undefined ? options.suffix : ']';
	const enforceHidden = options.enforceHidden!==undefined ? options.enforceHidden : false;
	const explore = match;

	if (!explore.join) {
		return true;
	}

	if (explore.hidden && !enforceHidden) {
		return true;
	}

	const maybePrefix = explore.view_label?.slice(0, prefix.length);
	const maybeSuffix = suffix.length===0 ? '' : explore.view_label?.slice(0-suffix.length);

	if (maybePrefix === prefix && maybeSuffix === suffix) {
		return true;
	}

	return `Hoist view in explore by using view_label like \`${prefix}...${suffix}\``;
}
