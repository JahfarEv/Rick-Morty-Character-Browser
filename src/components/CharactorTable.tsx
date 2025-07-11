import { Character } from '../lib/types';
import { motion } from 'framer-motion';

interface CharacterTableProps {
  characters: Character[];
  loading: boolean;
}

export const CharacterTable = ({ characters, loading }: CharacterTableProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-4 border-t-indigo-600 border-b-indigo-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg font-medium text-gray-600">Loading characters...</p>
      </div>
    );
  }

  if (!characters.length) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700">No characters found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Character
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Species
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Gender
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Origin
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {characters?.map((character, index) => (
            <motion.tr 
              key={character.id} 
              className="hover:bg-indigo-50 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img 
                      className="h-12 w-12 rounded-full border-2 border-indigo-200 shadow-sm" 
                      src={character?.image} 
                      alt={character?.name} 
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-gray-900">{character?.name}</div>
                    <div className="text-xs text-indigo-600 font-medium">{character?.type || 'Unknown type'}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className={`mr-2 w-3 h-3 rounded-full ${
                    character?.status === 'Alive' ? 'bg-green-500' :
                    character?.status === 'Dead' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    character?.status === 'Alive' ? 'bg-green-100 text-green-800' :
                    character?.status === 'Dead' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {character?.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {character?.species === 'Human' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="text-sm font-medium text-gray-700">{character?.species}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  character?.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                  character?.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {character?.gender}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-700 truncate max-w-[150px]">
                  {character?.origin.name}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};