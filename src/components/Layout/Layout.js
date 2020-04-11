import React from 'react';

import Aux from '../../hoc/Aux';

const layout = ( props ) => (
    <Aux>
        <header>
            <div>Logo</div>
            <nav>Nav Menu</nav>
        </header>
        
        <div>
            { props.children }
        </div>

        <footer>
            <div>
                Author information
            </div>
        </footer>
    </Aux>
)

export default layout;