const React = require('react')
const Nav = require('../components/Nav')
const DefaultLayout = require("../layout/Default")

class New extends React.Component {
    render() {
        return(
            <DefaultLayout title="Create a New Vegetable!" link="/vegetables" text="Home">
                <form action="/vegetables" method="POST">
                    Name: <input type="text" name="name"/>
                    Color: <input type="text" name="color"/>
                    Is Ready To Eat: <input type="checkbox" name="readyToEat"/>
                    <input type="submit" name="" value="Create Vegetable" />
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = New