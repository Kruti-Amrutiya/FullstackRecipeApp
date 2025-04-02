using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeAPI.Data;
using RecipeAPI.Models;

namespace RecipeAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RecipesController : ControllerBase
{
    private readonly RecipeContext _context;
    private readonly UserManager<IdentityUser> _userManager;


    public RecipesController(RecipeContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;

    }

    // GET: api/recipes
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes(string? title, string? description)
    {
        // return await _context.Recipes.ToListAsync(); 
        var query = _context.Recipes.AsQueryable();
        if (!string.IsNullOrEmpty(title))
        {
            query = query.Where(r => r.Title.ToLower().Contains(title.ToLower()));
        }
        var recipes = await query.ToListAsync();
        return Ok(recipes);
    }

    // GET: api/recipes/5
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
        {
            return NotFound();
        }

        return recipe;
    }

    // POST: api/recipes
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Recipe>> PostRecipe([FromForm] Recipe recipe, IFormFile? imageFile)
    {
        try
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                status = "SUCCESS",
                message = "Recipe created successfully.",
                payload = recipe
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                status = "ERROR",
                message = "An error occurred while creating the recipe.",
                error = ex.Message
            });
        }
    }

    //[HttpPost]
    //public async Task<IActionResult> PostRecipe([FromForm] Recipe recipe, IFormFile? imageFile)
    //{
    //    try
    //    {
    //        Console.WriteLine("KKKKKKK", imageFile, recipe);
    //        if (imageFile != null && imageFile.Length > 0)
    //        {
    //            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "template", "uploads");
    //            if (!Directory.Exists(uploadsFolder))
    //            {
    //                Directory.CreateDirectory(uploadsFolder);
    //            }

    //            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
    //            var filePath = Path.Combine(uploadsFolder, fileName);

    //            using (var stream = new FileStream(filePath, FileMode.Create))
    //            {
    //                await imageFile.CopyToAsync(stream);
    //            }

    //            // Save only the relative path to the database
    //            recipe.ImageUrl = $"/uploads/{fileName}";
    //        }

    //        _context.Recipes.Add(recipe);
    //        await _context.SaveChangesAsync();

    //        return Ok(new
    //        {
    //            status = "SUCCESS",
    //            message = "Recipe created successfully.",
    //            payload = recipe
    //        });
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, new
    //        {
    //            status = "ERROR",
    //            message = "An error occurred while creating the recipe.",
    //            error = ex.Message
    //        });
    //    }
    //}

    //[Authorize]
    //[HttpPost]
    //public async Task<IActionResult> PostRecipe([FromForm] Recipe recipe, [FromForm] IFormFile? imageFile)
    //{
    //    try
    //    {
    //        Debug.WriteLine($"Received Recipe: {recipe.Title}, {recipe.Description}, {recipe.Ingredients}");
    //        Debug.WriteLine($"Received Image File: {imageFile?.FileName}");


    //        if (imageFile != null && imageFile.Length > 0)
    //        {
    //            using (var memoryStream = new MemoryStream())
    //            {
    //                await imageFile.CopyToAsync(memoryStream);
    //                recipe.ImageData = memoryStream.ToArray(); // Save file as byte array
    //            }
    //        }

    //        _context.Recipes.Add(recipe);
    //        await _context.SaveChangesAsync();

    //        return Ok(new
    //        {
    //            status = "SUCCESS",
    //            message = "Recipe created successfully.",
    //            payload = recipe
    //        });
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, new
    //        {
    //            status = "ERROR",
    //            message = "An error occurred while creating the recipe.",
    //            error = ex.Message
    //        });
    //    }
    //}


    // PUT: api/recipes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
    {
        if (id != recipe.Id)
        {
            return BadRequest();
        }

        _context.Entry(recipe).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RecipeExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/recipes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        try
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound(new
                {
                    status = "ERROR",
                    message = "Recipe not found."
                });
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                status = "SUCCESS",
                message = "Recipe deleted successfully."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                status = "ERROR",
                message = "An error occurred while deleting the recipe.",
                error = ex.Message
            });
        }
    }


    private bool RecipeExists(int id)
    {
        return _context.Recipes.Any(e => e.Id == id);
    }

    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        var categories = Enum.GetValues(typeof(RecipeCategory))
            .Cast<RecipeCategory>()
            .Select(c => new
            {
                value = c.ToString(),
                label = FormatCategoryName(c)
            })
            .ToList();
        return Ok(categories);
    }

    private string FormatCategoryName(RecipeCategory category)
    {
        return category switch
        {
            RecipeCategory.Appetizer => "Appetizer",
            RecipeCategory.MainCourse => "Main Course",
            RecipeCategory.Dessert => "Dessert",
            RecipeCategory.Beverage => "Beverage",
            RecipeCategory.Snack => "Snack",
            RecipeCategory.Salad => "Salad",
            RecipeCategory.Soup => "Soup",
            _ => category.ToString()
        };
    }

}
