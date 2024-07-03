package com.library.payload.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CityRequest {

   @NotEmpty(message = "City Name is required")
   @Size(max = 15, message = "City must be at most 15 characters")
   @Pattern(regexp = "^[a-zA-Z ]{3,}$", message = "City name should not contain digits or special characters or empty spaces")
   private String cityName;
}
