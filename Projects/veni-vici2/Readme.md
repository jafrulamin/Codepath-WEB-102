# Web Development Project 4 - Trippin' on Cats

Submitted by: **Jafrul Amin**

This web app: **A cat discovery application that allows users to explore different cat breeds and ban specific attributes they don't want to see in future discoveries**

Time spent: **7** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should immediately add it to the ban list
  - Clicking on an attribute in the ban list should immediately remove it from the ban list
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  - [x] When clicked, an attribute in the ban list is immediately removed from the list of banned attributes

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
  - All four attributes (breed name, weight, origin, and life span) are clickable and can be banned
- [x] Users can see a stored history of their previously displayed results from this session
  - A dedicated sidebar displays all previously seen cats
  - History updates automatically with each new discovery

The following **additional** features are implemented:

- [x] Grid layout with dedicated sections for history and ban list
- [x] Visual feedback for banned attributes with color changes
- [x] Emoji decorations for enhanced user experience
- [x] Responsive design that works on different screen sizes

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='videoWalkthrough.gif' title='VideoWalkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

Describe any challenges encountered while building the app:

- Managing state for multiple banned attributes
- Implementing proper filtering logic for banned attributes
- Handling API response data consistently
- Ensuring proper image loading and sizing
- Implementing the history feature without causing performance issues

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
