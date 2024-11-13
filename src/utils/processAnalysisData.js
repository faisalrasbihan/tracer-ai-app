/**
 * Determines risk level based on deviation percentage
 * @param {number} deviationPercentage - Deviation value in percentage
 * @returns {string} Risk level (Low, Medium, or High)
 */
const getRiskLevel = (deviationPercentage) => {
  if (deviationPercentage > 25) return "High";
  if (deviationPercentage >= 15) return "Medium";
  return "Low";
};

/**
 * Processes API response into format needed for UI tables
 * @param {Object} response - Raw API response
 * @param {number} currentDocumentCount - Current number of documents (for naming)
 * @returns {Object} Processed data for both tables
 */
export const processAnalysisData = (response, currentDocumentCount = 0) => {
  // Extract the analysis object from the response
  const analysis = response.analysis;
  
  // Process data for homepage table
  const documentData = {
    id: Math.random().toString(36).substr(2, 9),
    name: `Document_${currentDocumentCount + 1}.pdf`,
    uploadDate: new Date().toLocaleString(),
    status: "Completed",
    vendor: analysis.vendor || "Unknown Vendor",
    amount: Math.round(analysis.total_harga || 0),
    marketPrice: Math.round(analysis.total_harga_pasar || 0),
    deviation: Math.round((analysis.deviation || 0) * 100),
    riskLevel: getRiskLevel((analysis.deviation || 0) * 100)
  };

  // Process data for analysis view table
  const itemsData = (analysis.item_anomaly || []).map(item => ({
    id: Math.random().toString(36).substr(2, 9),
    name: item.barang_dokumen || '',
    quantity: item.jumlah_barang || 0,
    unitPrice: Math.round(item.harga_dokumen || 0),
    totalPrice: Math.round(item.total_harga_dokumen || 0),
    marketPrice: Math.round(item.total_harga_pasar || 0),
    deviation: Math.round((item.persen_perbedaan_harga || 0) * 100),
    similarItemLink: '#'
  }));

  return {
    documentData,
    itemsData
  };
}; 