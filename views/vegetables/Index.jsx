const React = require("react")
const Nav = require('../components/Nav')
const DefaultLayout = require("../layout/Default")

class Index extends React.Component {
    render () {
        const {vegetables} = this.props
        return(
            <DefaultLayout title="Vegetables Index Page">  
                <Nav link="/vegetables/new" text="Create a Vegetable" />
                <ul>
                    {vegetables.map((vegetable, i) => {
                        return (
                            <li key={i}>
                                The {" "}
                                <a href={`/vegetables/${vegetable._id}`}>
                                    {vegetable.name}
                                </a> {" "}
                                is {" "}{vegetable.color} <br></br>
                                {vegetable.readyToEat
                                    ? `It is ready to eat`
                                    : `It is not ready to eat`}
                                <br />
                                {/* Link to this specific vegetable's edit page. */}
                            <a href={`/vegetables/${vegetable._id}/edit`}>Edit This Vegetable</a>
                                <form action={`/vegetables/${vegetable._id}?_method=DELETE`} method="POST">
                                    <input type='submit' value='DELETE' />
                                </form>
                            </li>
                        );
                    })}
                </ul>
            </DefaultLayout>
        )
    }
}

module.exports = Index;