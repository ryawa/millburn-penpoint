import { BookIcon } from "@sanity/icons";
import { format, formatISO, parseISO } from "date-fns";
import { defineArrayMember, defineField, defineType } from "sanity";
import author from "./author";
import blockContent from "./blockContent";
import category from "./category";

export default defineType({
  name: "article",
  title: "Article",
  icon: BookIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: author.name } })],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: category.name },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      initialValue: () => formatISO(new Date(), { representation: "date" }),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: blockContent.name,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "date",
      media: "coverImage",
    },
    prepare({ title, author, date, media }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), "MMM d, yyyy")}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});
