const React = require("react")
const DefaultLayout = require("../layout/Default")

class Edit extends React.Component {
  render() {
    //grabbing the vegetable givin to this page by the edit route on the server.
    const vegetable = this.props.vegetable
    return (
      <DefaultLayout
        title="Edit Page"
        // 2 properties below are for the Nav component
        link="/vegetables"
        text="Home"
      >
        <form action={`/vegetables/${vegetable._id}/?_method=PUT`} method="POST">
        {/* use the vegetable info to give the inputs a defaultValue for a nice user experience */}
        Name: <input type="text" name="name" defaultValue={vegetable.name} />
          Color: <input type="text" name="color" defaultValue={vegetable.color} />
          Is Ready To Eat: 
          {/* conditionally rendering the checkbox input to make it check by default or not. */}
          { 
            vegetable.readyToEat? 
              <input type="checkbox" name="readyToEat" defaultChecked />
            : 
              <input type="checkbox" name="readyToEat"/> 
          }
          <input type="submit" value="Submit Changes" />      
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = Edit