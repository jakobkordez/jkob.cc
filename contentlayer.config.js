import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: 'projects/*.mdx',
    contentType: "mdx",
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        tags: {
            type: "list",
            of: { type: "string" },
            required: true,
        },
        image: {
            type: "string",
        },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
        },
    },
}))

export default makeSource({
    contentDirPath: "content",
    documentTypes: [Project],
})
