

export function setLocalStorage<T>(key:string, value:T, days:number) {
	
	return new Promise((resolve, reject) => {
		const now = new Date()
		const item = {
			value: value,
			expiry: now.getTime() + (days*24*60*60*1000),
		}
		localStorage.setItem(key, JSON.stringify(item))	
		resolve(JSON.stringify(item))
	})
	
	
}

export function getLocalStorage<T>(key:string): Promise<T | null> {

	return new Promise((resolve, reject) => {
		const itemStr = localStorage.getItem(key)
		if (!itemStr) {
			return reject(null)
		}
		const item = JSON.parse(itemStr)
		const now = new Date()
		if (now.getTime() > item.expiry) {
			localStorage.removeItem(key)
			return reject(null)
		}
		return resolve(item.value as T)
	});
	
}