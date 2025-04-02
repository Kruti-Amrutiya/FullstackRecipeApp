using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace RecipeAPI.Models;

public enum RecipeCategory
{
    Appetizer,
    MainCourse,
    Dessert,
    Beverage,
    Snack,
    Salad,
    Soup,
}

public class Recipe
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public string Ingredients { get; set; }
    public string Instructions { get; set; }

    [Column(TypeName = "text")]
    [System.Text.Json.Serialization.JsonConverter(typeof(JsonStringEnumConverter))]
    public RecipeCategory Category { get; set; }
    public string Area { get; set; }
    public string Source { get; set; }
    public string Link { get; set; }
    public IFormFile ImageFile { get; set; }
    public byte[]? ImageData { get; set; }

}