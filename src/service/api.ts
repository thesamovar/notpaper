/**
 * API Service
 *
 * Wrapper for the NotPaper API
 */

const API_BASE = "http://localhost:5000"


const apiService = (base: string) => ({
	parse: async (text: string, source: string = 'latex') => {
		const url = `${base}/api/v1/parse?source=${source}`

		const res = await fetch(url, {
			method: 'POST',
			headers: new Headers({'content-type': 'application/json'}),
			body: JSON.stringify({
				text: btoa(text)  // base64 encoding
			})
		})

		if (!res.ok) {
			throw new Error(`API call to ${url} failed: ${await res.json()}`)
		}
		
		return await res.json()
	}
})

export default apiService(API_BASE)
