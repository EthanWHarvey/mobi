import sanityClient  from "@sanity/client";

 const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: 'v1',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})

export default client;
