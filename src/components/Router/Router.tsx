import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import SnackBar from '../Common/SnackBar';
import Dashboard from "../../pages/Dashboard/Dashboard";
import Categories from "../../pages/Categories/Categories";
import Products from "../../pages/Products/Products";
import Statistic from "../../pages/Statistic/Statistic";
import Users from "../../pages/Users/Users";
import Settings from '../../pages/Settings/Settings';
import HeaderBar from '../HeaderBar/HeaderBar';
import Content from '../Content/Content';
import s from './Router.module.scss'


const Router: React.FC = () => {
	const [isOpenSidebar, setOpenSidebar] = React.useState(true);
	const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);


	return (
		<BrowserRouter>
			<div className={s.container}>
				<Sidebar isOpen={isOpenSidebar} onSidebarToggle={toggleSidebar} />
				<SnackBar />

				<div className={s.main}>
					<HeaderBar
						onSidebarToggle={toggleSidebar}
						isShrink={isOpenSidebar}
					/>
					<Content>
						<Route path="/dashboard" render={() => <Dashboard />} />
						<Route path="/categories" render={() => <Categories />} />
						<Route path="/products" render={() => <Products />} />
						<Route path="/statistic" render={() => <Statistic />} />
						<Route path="/users" render={() => <Users />} />
						<Route path="/settings" render={() => <Settings />} />
					</Content>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default Router;
