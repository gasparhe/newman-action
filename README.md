# Notice

This Action is not an official Postman release. As of Postman v10, Postman will now automatically create a configuration for GitHub Actions. This is the recommended approach. For more information, please follow the below link:

https://learning.postman.com/docs/integrations/available-integrations/ci-integrations/github-actions/#configuring-the-postman-cli-for-github-actions

# Newman Action

Allows you to run Postman's headless collection runner, Newman, via a GitHub Action meaning no config of the Newman lib itself.

## Getting Started

This action supports only private collection and needs to parse collection, environment and the Postman API key,

See [Creating and using secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) for how to add your Postman API to GitHub securely.

```
- uses: actions/checkout@master
- uses: matt-ball/newman-action@master
  with:
    apiKey: ${{ secrets.postmanApiKey }}
    collection: 5922408-c22ef764-b464-424c-8702-750343478723
    environment: 5922408-228c7edd-fc15-4f68-9665-a35d7df6945b
```
