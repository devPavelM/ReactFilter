'use strict';

//API: https://jsonplaceholder.typicode.com

var Filter = React.createClass({

    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.filterInput).focus();
    },

    handleFilterChange: function(e) {
        this.props.updateFilter(e.target.value);
    },

    render: function() {
        return <input type="text" ref="filterInput" onChange={this.handleFilterChange} placeholder="фильтр" className="form-control" />;
    }

});

var Items = React.createClass(
    {
        render: function() {

            var content;
            if (this.props.items.length > 0) {
                var items = this.props.items.map( function(item) {
                    return  <div key={item.id}>
                                <li >
                                    <p><strong>{item.id}  {item.title}</strong></p>
                                    <p>{item.body}</p>
                                </li>
                            </div>;
                });
                content = <ul>{items}</ul>;
            } else {
                content = <p>Нет совпадений</p>
            }

            return (
                <div className='results'>
                    <h4>Результат</h4>
                    {content}
                </div>
            );
        }
    }
);

var App = React.createClass(
    {
        componentDidMount: function() {
            var url = 'https://jsonplaceholder.typicode.com/posts';
            $.ajax({
                url: url,
                dataType: 'json',
                cache: true,
                method: 'GET',
                success: function(data) {
                    this.setState({listItems: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(url, status, err.toString());
                }.bind(this)
            });
        },

        getInitialState: function() {
                return {
                    listItems: [],
                    nameFilter: ''
                };
        },

        handleFilterUpdate: function(filterValue) {
            this.setState({
                nameFilter: filterValue
            })
        },

        render: function () {

            var displayedItems = this.state.listItems.filter(function(item) {
                var match = item.title.toLowerCase().indexOf(this.state.nameFilter.toLowerCase());
                return (match !== -1);
            }.bind(this));

            return(
                <div className="App">
                    <h1>Find application</h1>
                    <Filter updateFilter={this.handleFilterUpdate}/>
                    <Items items={displayedItems} />
                </div>
            )
        }
    }
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
