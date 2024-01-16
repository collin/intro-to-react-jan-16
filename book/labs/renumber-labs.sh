#!/bin/bash

# Get the directory where the script is located
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if one argument is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <directory_name>"
  exit 1
fi

target_dir=$1
labs_dir="$script_dir"

# Check if the target directory exists
if [ ! -d "$labs_dir/$target_dir" ]; then
  echo "Error: Directory '$target_dir' not found in '$labs_dir'."
  exit 1
fi

# Extract the index from the target directory name
index=$(echo "$target_dir" | cut -d'-' -f1)

# Increment the index by 1
new_index=$((index + 1))

# Rename the target directory
mv "$labs_dir/$target_dir" "$labs_dir/$(printf "%02d" $new_index)-$(echo "$target_dir" | cut -d'-' -f2-)"

# Increment the index for all following directories
for dir in "$labs_dir"/*; do
  # Check if it's a directory and its index is greater than or equal to the new index
  if [ -d "$dir" ] && [ "$(basename "$dir" | cut -d'-' -f1)" -ge "$new_index" ]; then
    mv "$dir" "$labs_dir/$(printf "%02d" $((new_index++)))-$(echo "$dir" | cut -d'-' -f2-)"
  fi
done

echo "Directories re-numbered successfully."
