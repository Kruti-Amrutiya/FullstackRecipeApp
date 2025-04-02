import { z } from "zod";

const recipeFormSchema = z.object({
  title: z.string({
    required_error: "Recipe Name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  ingredients: z.string({
    required_error: "Ingredients are required",
  }),
  instructions: z.string({
    required_error: "Instructions is required",
  }),
  category: z.object(
    {},
    {
      required_error: "Category is required",
    }
  ),
  area: z.string({
    required_error: "Area is required",
  }),
  source: z
    .string({
      required_error: "Source is required",
    })
    .url("Must be a valid URL"),
  link: z
    .string({
      required_error: "Link is required",
    })
    .url("Must be a valid URL"),
});

export default recipeFormSchema;
