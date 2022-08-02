download-history:
	curl -O -L "https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_OWNER}/${BITBUCKET_REPO_SLUG}/downloads/history_${BITBUCKET_BRANCH}.zip"

slack-notification:
	curl -s -X POST https://hooks.slack.com/services/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 \
	-H "content-type:application/json" \
    -d '{"text":"[${BITBUCKET_REPO_SLUG}][${BITBUCKET_BRANCH}]\n<https://${AWS_STORAGE_BUCKET_NAME}/${BITBUCKET_BRANCH}/index.html|Allure report>\n"}'

slack-notification-test:
	curl -s -X POST https://hooks.slack.com/services/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 \
	-H "content-type:application/json" \
    -d '{"text":"[${BITBUCKET_REPO_SLUG}][${BITBUCKET_BRANCH}]\n<https://${AWS_STORAGE_BUCKET_NAME}/${BITBUCKET_BRANCH}/index.html|Allure report>\n"}'

upload-history:
	curl -X POST "https://${BITBUCKET_USERNAME}:${BITBUCKET_APP_PASSWORD}@api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_OWNER}/${BITBUCKET_REPO_SLUG}/downloads" --form files=@"allure-report/history_${BITBUCKET_BRANCH}.zip"