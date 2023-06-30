const {
	getAllLaunches,
	addNewLaunch,
	existsLaunchWithID,
	abortLaunchById,
	scheduleNewLaunch
} = require('../../models/launches.model');
const {
	getPagination
} = require('../../services/query');

async function httpGetAllLaunches(req,res) {
	const {skip, limit} = getPagination(req.query);
	const launches = await getAllLaunches(skip, limit);
	return res.status(200).json(launches);
}

async function httpAddNewLaunch(req,res) {
	const launch = req.body;
	
	if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
		return res.status(400).json({
			error: 'Missing property: mission, rocket, launch date, or target',
		});
	}
	
	launch.launchDate = new Date(launch.launchDate);
	if (isNaN(launch.launchDate)) {
		return res.status(400).json({
			error: 'Invalid launch date'
		})
	}
	
	await scheduleNewLaunch(launch);
	// console.log(launch);
	return res.status(201).json(launch);
}

async function httpAbortLaunch(req,res) {
	const launchId = Number(req.params.id);
	
	const existsLaunch = await existsLaunchWithID(launchId);
	if (!existsLaunch) {
		return res.status(404).json({
			error: 'Launch not found'
		})
	}
	
	//if launch does exist
	const aborted = await abortLaunchById(launchId);
	// console.log(aborted);
	
	if (!aborted) {
		return res.status(400).json({
			error: 'Launch not aborted'
		})
	}
	return res.status(200).json({
		ok: true
	});
}

module.exports = {
	httpGetAllLaunches,
	httpAddNewLaunch,
	httpAbortLaunch
}
