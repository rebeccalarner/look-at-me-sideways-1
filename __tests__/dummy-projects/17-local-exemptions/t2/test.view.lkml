view: user_product_affinity {
	derived_table: {
		# LAMS
		# rule_exemptions: {
		#	T2: "This DT is missing the --- separator from T8, but T2 (which introduces the requirement for T3-T10) is globally exempt"
		# }

		sql:
			SELECT
				pk2_user_id,
				pk2_product_id,
				COUNT(*) as ct
			FROM order_items
			GROUP BY 1,2
		;;
	}
}
